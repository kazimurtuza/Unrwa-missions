"use client";
import styles from "@/app/admin/style/deshboard.module.css";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa6";

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  };

  export const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [100,200,205,205,306,600,654,585,696,585,510],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: [60,50,225,285,236,86,242,385,196,285,258],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Dataset 3',
        data: [80,80,500,300,400,500,400,15,600,400,400],
        borderColor: 'rgb(53, 162, 50)',
        backgroundColor: 'rgb(53, 162, 50)',
      },
      {
        label: 'Dataset 4',
        data: [100,200,400,10,200,300,400,250,250,400,250],
        borderColor: 'rgb(50, 99, 132)',
        backgroundColor: 'rgb(50, 99, 132)',
      },
      {
        label: 'Dataset 5',
        data: [400,10,200,300,400,250,250,400,250,100,200],
        borderColor: 'rgb(53, 162, 15)',
        backgroundColor: 'rgb(53, 162, 15)',
      },
      {
        label: 'Dataset 6',
        data: [10,200,300,400,250,250,400,250,100,200,400],
        borderColor: 'rgb(53, 10, 50)',
        backgroundColor: 'rgb(53, 10, 50)',
      },
    ],
  };

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

          <div style={{padding: '30px 200px'}}>
          { /* <Line options={options} data={data} /> */ }
          </div>

      </main>
  );
}

export default Dashboard;
