"use client";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import {black, yellow} from "next/dist/lib/picocolors";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa6";
import styles from "@/app/admin/style/deshboard.module.css"
import {useEffect, useState} from "react";
import axiosClient from "@/app/axiosClient";

function Dashboard() {

    const [totalUser,setTotalUser]=useState(0);
    const [totalProduct,setTotalProduct]=useState(0);
    const [totalOrder,setTotalOrder]=useState(0);
    const [totalCompleteOrder,setTotalCompleteOrder]=useState(0);
    const [isLoading,setLoading]=useState(1);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get('admin-dashboard');
                if(data.success==true){
                    setTotalCompleteOrder(data.result.completeOrderList)
                    setTotalOrder(data.result.orderList)
                    setTotalProduct(data.result.productList)
                    setTotalUser(data.result.userList)
                    setLoading(0)
                }

            } catch (error) {
                setProductList([]);
                // console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount


    let loader= <div className={styles.loader}></div>

  return (
      <main>
          <div className="grid grid-cols-4 gap-4  p-3">

                  <div className={styles.itemcard} style={{ backgroundColor: '#76978f4a' }}>

                  <div className="grid grid-cols-2 gap-2 ">
                      <div className={styles.round} style={{ backgroundColor: '#eaf3f3' }}> <AiOutlineUser size={40} /></div>
                      <div>
                          <h1 className={styles.totalnumber}>{ isLoading?loader:totalUser}</h1>
                          <h5 className={styles.subtitle} >Total Number of User</h5>
                      </div>

                  </div>
              </div>
              <div className={styles.itemcard} style={{ backgroundColor: '#cbcbcb' }}>

                  <div className="grid grid-cols-2 gap-2 ">
                      <div className={styles.round} style={{ backgroundColor: '#d9d7d7' }}> <FaProductHunt size={40} /></div>
                      <div>
                          <h1 className={styles.totalnumber}>{ isLoading?loader:totalProduct}</h1>
                          <h5 className={styles.subtitle} >Total Number of Product</h5>
                      </div>
                  </div>
              </div>
              <div className={styles.itemcard} style={{ backgroundColor: '#e7a93c63' }}>

                  <div className="grid grid-cols-2 gap-2 ">
                      <div className={styles.round} style={{ backgroundColor: '#e9c27d' }}> <BsCart size={40} /></div>
                      <div>
                          <h1 className={styles.totalnumber}>{ isLoading?loader:totalOrder}</h1>
                          <h5 className={styles.subtitle} >Total Number of Order</h5>
                      </div>

                  </div>
              </div>
              <div className={styles.itemcard} style={{ backgroundColor: '#65ebacd6' }}>

                  <div className="grid grid-cols-2 gap-2 ">
                      <div className={styles.round} style={{ backgroundColor: '#cbcb4145' }}>  <BsCart size={40} /></div>
                      <div>
                          <h1 className={styles.totalnumber}>{ isLoading?loader:totalCompleteOrder}</h1>
                          <h5 className={styles.subtitle} >Total completed order</h5>
                      </div>

                  </div>
              </div>





          </div>

      </main>
  );
}

export default Dashboard;
