"use client";
import styles from "@/app/admin/style/deshboard.module.css";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";

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

function Dashboard() {
    const [rejectCount, setrejectCount] = useState(0);
    const [totalMission, settotalMission] = useState(0);
    const [completed, setcompleted] = useState(0);
    const [approved, setapproved] = useState(0);

    const [approvedToday, setapprovedToday] = useState(0);
    const [rejectCountToday, setrejectCountToday] = useState(0);
    const [completedToday, setcompletedToday] = useState(0);
    const [totalMissionToday, settotalMissionToday] = useState(0);

    const [cluster, setcluster] = useState([]);
    const [isLoading, setLoading] = useState(1);
    const [dateList, setDateList] = useState([]);
    const [isloadmap, setisloadmap] = useState(1);
 var isset=0

    function getCurrentMonthDateList() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // Note: January is 0, February is 1, ..., December is 11
        // Get the number of days in the current month
        const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
        // Construct the date list array
        const dateList = [];
        for (let day = 1; day <= numberOfDaysInMonth; day++) {
            const dateString = new Date(year, month, day).toISOString().slice(0, 10);
            dateList.push(dateString);
        }

        setDataset(prevDataset => ({
            ...prevDataset,
            labels: dateList,
        }));
        return dateList;
    }

    const fetchData = async () => {
        try {
            const {data} = await axiosClient.get('admin-dashboard');
            if (data.success == true) {
                setrejectCount(data.result.rejectCount)
                settotalMission(data.result.totalMission)
                setcompleted(data.result.completed)
                setapproved(data.result.approved)

                setapprovedToday(data.result.approvedToday)
                setrejectCountToday(data.result.rejectCountToday)
                setcompletedToday(data.result.completedToday)
                settotalMissionToday(data.result.totalMissionToday)
                setLoading(0)
            }
        } catch (error) {
            setProductList([]);
            // console.error('Error fetching categories:', error);
        }
    };

    // const fetchCluster = async () => {
    //     try {
    //         const {data} = await axiosClient.get('admin-dashboard');
    //         if (data.success == true) {
    //             await setcluster(old => data.result.clusterList)
    //             setLoading(0)
    //         }
    //     } catch (error) {
    //         setProductList([]);
    //         // console.error('Error fetching categories:', error);
    //     }
    // };

    let loader = <div className={styles.loader}></div>

    const data = {
        labels: [],
        // dataset:dataset,
        datasets: [],
    };
    const data1 = {
        labels: [
            '2024-03-01', '2024-03-02', '2024-03-03',
            '2024-03-04', '2024-03-05', '2024-03-06',
            '2024-03-07', '2024-03-08', '2024-03-09',
            '2024-03-10', '2024-03-11', '2024-03-12',
            '2024-03-13', '2024-03-14', '2024-03-15',
            '2024-03-16', '2024-03-17', '2024-03-18',
            '2024-03-19', '2024-03-20', '2024-03-21',
            '2024-03-22', '2024-03-23', '2024-03-24',
            '2024-03-25', '2024-03-26', '2024-03-27',
            '2024-03-28', '2024-03-29', '2024-03-30',
            '2024-03-31'
        ],
        // dataset:dataset,
        datasets: [ {
            label: "Loading..",
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            borderColor: 'rgb(53, 162, 235)',
            ackgroundColor: 'rgb(53, 162, 235)',
        }],
    };

    const [dataset, setDataset] = useState(data);

    async function clusterList() {
        if (isset == 0) {
            isset= 1;
            console.log(isset)
            const {data} = await axiosClient.get('mission-cluster');
            if (data.success) {
                let cluster = await data.result
                var dataList = await getCurrentMonthDateList()
                for (const item of cluster) {
                    let i = 0;
                    const {data} = await axiosClient.post('chart', {date: dataList, id: item._id});
                    console.log(data.retsult)
                    i = i + 1;
                    await additem(item.name, data.retsult, i);
                }

                console.log(dataset)
            }

            setisloadmap(0)
        }
    }

    useEffect(() => {
        fetchData()
        getCurrentMonthDateList()
        // fetchCluster();
        clusterList();

        // addDatasets();
    }, [clusterList]); // Empty dependency array means this effect runs only once, similar to componentDidMount

    function additem(name, dataList, index) {
        // Generate random RGB values
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);

        let newItem = {
            label: name,
            data: dataList,
            borderColor: `rgb(${red}, ${green}, ${blue})`, // Fix RGB formatting
            backgroundColor: `rgb(${red}, ${green}, ${blue})`, // Fix RGB formatting
        };

        setDataset(prevDataset => ({
            ...prevDataset,
            datasets: [...prevDataset.datasets, newItem]
        }));
    }

    return (
        <div className="flex h-screen overflow-hidden">

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main className="dashboar-main">

                    <h3 className="text-2xl font-semibold leading-tight ml-2 mt-4">Today</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  p-3">

                        <div className={styles.itemcard} style={{backgroundColor: '#76978f4a'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#eaf3f3'}}>
                                <svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#1b7c85" d="M41 7C31.6-2.3 16.4-2.3 7 7S-2.3 31.6 7 41l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zM599 7L527 79c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM212.1 336c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-.5-1.4-1-2.7-1.6-4c-9.4-22.3-29.8-38.9-54.3-43c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-.8 .1-1.7 .3-2.5 .5c-24.9 5.1-45.1 23-53.4 46.5zM175.8 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-26.5 32C119.9 256 96 279.9 96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg>
                                </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : totalMissionToday}</h1>
                                    <h5 className={styles.subtitle}>Today Mission Submitted </h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#cbcbcb'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#d9d7d7'}}><svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1b7c85" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg></div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : completedToday}</h1>
                                    <h5 className={styles.subtitle}>Today Mission Completed</h5>
                                </div>
                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#e7a93c63'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#e9c27d'}}>
                                <svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#1b7c85" d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/></svg>
                                </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : approvedToday}</h1>
                                    <h5 className={styles.subtitle}>Today CLA Approved</h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#65ebacd6'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#cbcb4145'}}>

                                <svg width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1b7c85" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : rejectCountToday}</h1>
                                    <h5 className={styles.subtitle}>Today Rejected</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                    <h3 className="text-2xl font-semibold leading-tight ml-2 mt-4">Over all</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  p-3">

                        <div className={styles.itemcard} style={{backgroundColor: '#76978f4a'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                            <div className={styles.round} style={{backgroundColor: '#eaf3f3'}}>
                            <svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#1b7c85" d="M41 7C31.6-2.3 16.4-2.3 7 7S-2.3 31.6 7 41l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zM599 7L527 79c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM212.1 336c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-.5-1.4-1-2.7-1.6-4c-9.4-22.3-29.8-38.9-54.3-43c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-.8 .1-1.7 .3-2.5 .5c-24.9 5.1-45.1 23-53.4 46.5zM175.8 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-26.5 32C119.9 256 96 279.9 96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path></svg>
                            </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : totalMission}</h1>
                                    <h5 className={styles.subtitle}>Total Mission Submitted </h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#cbcbcb'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                            <div className={styles.round} style={{backgroundColor: '#d9d7d7'}}><svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1b7c85" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg></div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : completed}</h1>
                                    <h5 className={styles.subtitle}>Total Mission Completed</h5>
                                </div>
                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#e7a93c63'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                            <div className={styles.round} style={{backgroundColor: '#e9c27d'}}>
                            <svg width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#1b7c85" d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z"/></svg>
                            </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : approved}</h1>
                                    <h5 className={styles.subtitle}>Total CLA Approved</h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#65ebacd6'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                            <div className={styles.round} style={{backgroundColor: '#cbcb4145'}}>

                            <svg width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1b7c85" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                            </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : rejectCount}</h1>
                                    <h5 className={styles.subtitle}>Total Rejected</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* <h4>Total Report</h4> */}
                    {/* <div className="grid grid-cols-4 gap-4  p-3">

                        <div className={styles.itemcard} style={{backgroundColor: '#76978f4a'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#eaf3f3'}}><AiOutlineUser
                                    size={40}/></div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : totalMission}</h1>
                                    <h5 className={styles.subtitle}>Total Mission Submitted </h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#cbcbcb'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#d9d7d7'}}><FaProductHunt
                                    size={40}/></div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : completed}</h1>
                                    <h5 className={styles.subtitle}>Total Mission Completed</h5>
                                </div>
                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#e7a93c63'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#e9c27d'}}><BsCart size={40}/>
                                </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : approved}</h1>
                                    <h5 className={styles.subtitle}>Total CLA Approved</h5>
                                </div>

                            </div>
                        </div>
                        <div className={styles.itemcard} style={{backgroundColor: '#65ebacd6'}}>

                            <div className="grid grid-cols-2 gap-2 ">
                                <div className={styles.round} style={{backgroundColor: '#cbcb4145'}}><BsCart size={40}/>
                                </div>
                                <div>
                                    <h1 className={styles.totalnumber}>{isLoading ? loader : rejectCount}</h1>
                                    <h5 className={styles.subtitle}>Total Rejected</h5>
                                </div>

                            </div>
                        </div>

                    </div> */}

                    <div className="chart-wrap mt-4">
                        {isloadmap==1? <Line options={options} data={data1}/>:<Line options={options} data={dataset}/>}
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Dashboard;
