const { errorResponser } = require('../libs/controller-helper');
const fs = require('fs');
const User = require('../models/user');
const Order = require('../models/order');
const Store = require('../models/store');
const Menu = require('../models/menu');
const path = require('path');
const sendEmail = require('../utils/email');
module.exports = async ctx => {
    const {
        currentUser: {
            id: userId,
            type,
        } = {},
        request: {
            body: {
                storeId,
                payment,
                pickupTime,
                items,
            } = {}
        } = {}
    } = ctx;

    await Order.insert({
        customerId: userId,
        storeId: storeId,
        status: 'Confirmed',
        payment: payment,
        pickupTime: pickupTime,
    },items);


   const [usrInfo] = await User.getUserById({
        id: userId,
    });

    const [theStore] = await Store.getStoreByStoreId({
        storeId,
    });

    const itemsWithName =  await Promise.all(items.map(async (item)=>{
        const menuId = item.menuId
        const [theMenu] = await Menu.getMenuByMenuId({
            menuId,
        });
        const amount = theMenu.amount - item.quantity;
        const data= {
            ...theMenu,
            amount
        }

        const theMenuUpdate = await Menu.update({
            data,
            menuId,
          });

        return {
            ...item,
            menuName: theMenu.name
        }


    }))



    function generateEmailContentHTML(storeName, pickupTime, items) {
        // 讀取email-template.html文件的內容
        const templatePath = path.join(__dirname, '..', 'stuff/mail_template.html');
        const templateContent = fs.readFileSync(templatePath, 'utf-8');
      
        // 將模板中的{{storeName}}、{{pickupTime}}和{{items}}替換為實際數據
        const replacedContent = templateContent
          .replace('{{storeName}}', storeName)
          .replace('{{pickupTime}}', pickupTime)
          .replace('{{items}}', generateItemsList(items));
      
        return replacedContent;
      }
      
      function generateItemsList(items) {
        let itemsList = '<ul>';
      
        items.forEach((item, index) => {
          const { menuName, quantity, payment } = item;
          itemsList += `<li>${index + 1}. 菜品：${menuName}，數量：${quantity}，金額：${payment}元</li>`;
        });
      
        itemsList += '</ul>';
        return itemsList;
      }


    if (usrInfo) {
        await sendEmail(
            usrInfo.emailAddress,
          '訂單成功寄送',
            ``,
            generateEmailContentHTML(theStore.name,pickupTime,itemsWithName),
        );
      }
    
    ctx.body = {
        result: 'success'
    };
    
    return true;
}