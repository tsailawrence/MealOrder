import { instance } from '@/lib/utils';
const orderData = [
    {
        id: 1,
        name: "美式餐酒館",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/28 9:05 AM",
        total: "NT$200.00",
        status: "Preparing",
        pickupTime: "10/28 9:15 AM",
    },
    {
        id: 2,
        name: "Donuts hut",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/28 8:15 AM",
        total: "NT$120.00",
        status: "Confirmed",
        pickupTime: "10/28 11:15 AM",
    },
    {
        id: 3,
        name: "美式餐酒館",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        },
        {
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/27 7:05 AM",
        total: "NT$520.00",
        status: "Completed",
        pickupTime: "10/28 9:15 AM",
    },
    {
        id: 1,
        name: "美式餐酒館",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/28 9:05 AM",
        total: "NT$200.00",
        status: "Preparing",
        pickupTime: "10/28 9:15 AM",
    },
    {
        id: 2,
        name: "Donuts hut",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 2,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/28 8:15 AM",
        total: "NT$120.00",
        status: "Confirmed",
        pickupTime: "10/28 11:15 AM",
    },
    {
        id: 3,
        name: "美式餐酒館",
        items: [{
            id: 1,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 4,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        },
        {
            id: 5,
            name: "Burger",
            price: 100,
            quantity: 2,
            note: "No onion",
            specialInstructions: ["No onion"],
        },
        {
            id: 6,
            name: "Fries",
            price: 50,
            quantity: 1,
            note: "",
            specialInstructions: [],
        }],
        time: "10/27 7:05 AM",
        total: "NT$520.00",
        status: "Completed",
        pickupTime: "10/28 9:15 AM",
    },
];
export const getOrders = async (accessToken:string) => {
    // // Register
    // try {
    //     if (!accessToken) {
    //         throw new Error('AccessToken Not Exist.');
    //     }
    //     const { data: response } = await instance.get(`/my/orders`, {
    //         params: {
    //             accessToken,
    //         },
    //     });
    //     return response.data;
    // }
    // catch (err) {
    //     console.log('getOrders error', err);
    // }
    // FakeData
    console.log('getOrders accessToken', accessToken);
    return orderData;
}