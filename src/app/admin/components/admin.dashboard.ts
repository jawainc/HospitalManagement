import { Component, OnInit }                    from '@angular/core';


@Component({
  templateUrl: '../templates/admin.dashboard.html',
  styleUrls: ['../styles/admin.dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit{

  type: any;
  data = {};
  options = {};

  ngOnInit(){

    this.type = 'line';
    this.data = {
      labels: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
      ],
      datasets: [
        {
          label: "Income",
          fill: true,
          backgroundColor: "rgba(162,210,0,0.2)",
          borderColor: "rgba(162,210,0,1)",

          data: [
            10000, 1000, 9000, 8000, 5000, 2000, 1000,
            4000, 200, 8000, 6000, 7000, 1000, 4000
          ]
        },
        {
          label: "Expenditures",
          fill: true,
          backgroundColor: "rgba(230,74,25,0.2)",
          borderColor: "rgba(230,74,25,1)",

          data: [
            1000, 500, 2000, 1000, 100, 4000, 1000,
            400, 5000, 9000, 10, 500, 6000, 200
          ]
        },
        {
          label: "Patients",
          fill: true,
          backgroundColor: "rgba(33,33,33,0.2)",
          borderColor: "rgba(33,33,33,1)",

          data: [
            50, 40, 100, 10, 15, 60, 35,
            89, 19, 20, 30, 36, 52, 42
          ]
        }
      ]
    };
    this.options = {
      title: {
        text: "Monthly Report",
        position: 'top',
        fullWidth: true,
        display: true,
        fontSize: 16,
        fontFamily: 'Lato'
      },
      legend: {
        display: true,
        position: 'right'
      },
      responsive: true,
      maintainAspectRatio: false,
      fill: true
    };

  }

}
