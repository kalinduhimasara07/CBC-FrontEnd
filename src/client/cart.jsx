import { useState } from "react";
import { getCart } from "../utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Cart() {
    const [cart, setCart] = useState(getCart());
    return(
        <div className="pt-[100px] w-full h-full flex flex-col items-center">
            {
                cart.map((item)=>{
                    return(
                        <div key={item.productId} className="w-[75%] h-[100px] flex items-center shadow-xl justify-between my-2 p-4 border-b border-gray-300">
                            <div className="flex items-center">
                                <img src={item.images} alt={item.name} className="w-[90px] h-[90px] object-cover rounded-2xl mr-4" />
                                <div>
                                    <h2 className="text-lg font-semibold text-[#e17100]">{item.name}</h2>
                                    <p className="text-gray-800 text-[12px] font-semibold">{item.productId}</p>
                                    <p className=" text-green-700 font-bold">{(item.price<item.labeledPrice)&&<span className="line-through text-red-600 mr-2">${item.labeledPrice.toFixed(2)}</span>}${item.price} </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l">-</button>
                                <span className="bg-gray-200 text-gray-800 font-semibold py-2 px-4">{item.qty}</span>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r">+</button>
                            </div>
                            {/* total */}
                            <div className="flex items-center">
                                <p className="text-gray-800 font-bold text-xl">Total: &nbsp;</p>
                                <p className="text-gray-800 font-semibold">${(item.price*item.qty).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"><FaRegTrashAlt /></button>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    );
}