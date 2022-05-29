import { LightningElement, api,track } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs'
import {loadScript} from 'lightning/platformResourceLoader'
export default class Charts extends LightningElement {
    isChartJsInitialized
    chart
    @api type
    @api chartData
    @api chartHeading
    @api chartLabels
    @track datearray=[]

    renderedCallback(){
        if(this.isChartJsInitialized){
            return;
        }
        loadScript(this, chartJs+'/chartJs/Chart.js').then(()=>{
            console.log("chartJs loaded succesfully")
            this.isChartJsInitialized = true
            this.loadCharts()
        }).catch(error=>{
            console.error(error)
        })
    }

    loadCharts(){
        window.Chart.platform.disableCSSInjection = true

        const canvas = document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas)
        const ctx = canvas.getContext('2d')
        this.chart = new window.Chart(ctx, this.config())
    }

datecreation(){
    this.date=new Date()
    console.log('inside datecreation')
    for(let i=1;i<=10;i++){
        let temp=this.date.getDate()
        console.log('inside for',temp.toISOString().split('T')[0])
        this.datearray.push(temp)
        console.log('datearray',this.datearray)
    }
    console.log('this.datearray',this.datearray)
}
    config(){
        return {
            type: 'line',
            data: {
                labels:['2023-01-01','2023-01-05','2023-01-06','2023-01-07'],
                datasets: [{
                    label: 'data',
                    data: [100,200,400,800],
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(30, 204, 148, 0.8)', 
                        'rgba(130, 204, 148, 0.8)'
                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                scales: {
                    y: {
                        labels: ['time','tide']
                    }
                }
            }
        }
    }
}