import React from "react";
import '../coinChart/chart.css'
import { useEffect, useState } from "react";
import axios from "axios";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend);
    
const Chart = ({cryptoId}) => {
    const [data, setData] = useState(null);
    var data2;
    var response;
    const [time, setTime] = React.useState('24');

    useEffect(() => {
        const fetchChart = async () => {
            if (time == '14'){
                console.log('2W')
                    response = await axios.post('https://localhost:5000/api/crypto/cryptoChartWeekly',
                {
                    'cryptoId': cryptoId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })


            } if (time == 'max'){
                console.log('6M')
                    response = await axios.post('https://localhost:5000/api/crypto/cryptoChartMax',
                {
                    'cryptoId': cryptoId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })


            } else if (time == '24') {
                console.log('1D')
                    response =  await axios.post('https://localhost:5000/api/crypto/cryptoChartDaily',
                {
                    'cryptoId': cryptoId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            }
            
            const json = await response.data
            if (response.status === 200){
                setData(json);
            }
        }
        fetchChart()
    }, [time]);

    if (data){
        const coinChartData = data && data.cryptoChart.map(value => ({
            x: value[0], y:value[1].toFixed(2) 
        }));

        // const reverseMax  = data && data.cryptoChart
        // reverseMax.reverse();
        // const coinChartMax = reverseMax(value => ({
        //     x: value[0], y:value[1].toFixed(2) 
        // }));

        // console.log(reverseMax.reverse())


        if (time == '24'){
            data2 = {
                labels: coinChartData.map(value => moment(value.x).format('ddd, hA')),
                datasets: [
                    {
                        fill: true,
                        data: coinChartData.map(value => value.y),
                        label: cryptoId,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                ]
            }
        } 
        
        // if (time == 'max'){
        //     data2 = {
        //         labels: coinChartMax.map(value => moment(value.x).format('ddd, hA')),
        //         datasets: [
        //             {
        //                 fill: true,
        //                 data: coinChartData.map(value => value.y),
        //                 label: cryptoId,
        //                 borderColor: 'rgb(53, 162, 235)',
        //                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //             }
        //         ]
        //     }
        // } 
        
        else 
        {
            data2 = {
                labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
                datasets: [
                    {
                        fill: true,
                        data: coinChartData.map(value => value.y),
                        label: cryptoId,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                ]
            }
        }
    }

const options = {
    responsive: true
}

const handleChange = (event, newAlignment) => {
    setTime(newAlignment);
};


return ( 
<div className="line-chart">
    <ToggleButtonGroup
        color="primary"
        value={time}
        exclusive
        onChange={handleChange}
        aria-label="Platform">
        <ToggleButton value="24">24</ToggleButton>
        <ToggleButton value="14">2W</ToggleButton>
        <ToggleButton value="max">6M</ToggleButton>
        </ToggleButtonGroup>
        { data ? (<Line options={options} data={data2} />) : ('test')}
</div> );
}
 
export default Chart;