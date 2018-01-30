import { Component, OnInit } from '@angular/core';
import { WellApplicationServices } from './well-application.service';

@Component({
  selector: 'app-root',
  providers: [WellApplicationServices],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public api_uwi: number;
  public operator_name: string;
  public lease_name: string;
  public county: string;
  public reservior: string;
  public production_type: string;
  public production_status: string;
  public drill_type: string;
  public first_prod_date: string;
  public last_prod_date: string;
  public cum_gas: number;
  public cum_oil: number;
  public cum_boe: number = 0;
  public completion_date: string;
  public spud_date: string;
  public measured_depth: string;
  public state: string;
  public lat: number;
  public long: number;
  public lati = 31.7383217;
  public longi = -101.9890111;
  public previous: number = -1;
  public current: number = -1;
  public isOpen = true;
  public tooltip: string;

  public firstproddate: string = "0";
  public firstsixtygas: string = "0";
  public firstsixtyoil: string = "0";
  public firsttwelvegas: string = "0";
  public firsttwelveoil: string = "0";
  public firsttwentyfourgas: string = "0";
  public firsttwentyfouroil: string = "0";
  public lasttwelvegas: string = "0";
  public lasttwelveoil: string = "0";
  public roifirsttwelve: string = "0%";
  public roifirsttwentyfour: string = "0%";
  public roifirstsixty: string = "0%";
  public roilasttwelve: string = "0%";

  public index: number = -1;

  public investment_amount = 1500000;
  public nri_percentage = 0.5625;
  public gross_cash_flow_wo_expenses = 1500000;

  public sold_boe = 31612;
  public production_expenses = 0;

  public average_oil_price = 0;

  public tax = 0.046;
  public tax_gas = 0.075;

  public compare_estimate;
  public temp_cum_oil;
  public ows_score: number;
  public mapurl;
  public green_count = 0;
  public yellow_count = 0;
  public textcolor;
  public color = 'red';
  public potential_profit_loss: number = 0;

  public estimated_gross_cash_flow: number = 0;
  public temp_estimated_gross_cash_flow = [];
  public oil_price = 60;
  public gas_price = 3;

  public partner_name = "LC GoOpCo Midland #1, LP";

  public well_count: number;
  public latlong = [];
  public visit: number = -1;
  public currentgreencount: number = 0;
  public length: number = 0;
  public zoom: number = 12;
  public roi_percentage: string = "0%";
  public slider_percentage: string = "0%";

  public partnership_raise = 1500000;
  public partnership_term = 56.25;

  constructor(private wellapplicationservices: WellApplicationServices) {
  }

  // Initializing the Data to Map and Panels
  ngOnInit() {
    // Calling JSON Object and Parsing Value
    this.wellapplicationservices.getFiveMilesJSON().subscribe(
      JSONlat => {
        for (var i = 0; i < JSONlat.length; i++) {
          this.latlong[i] = JSONlat[i],
            error => console.log(error)
        }
        //console.log("JSON :" + JSONlat);
        //console.log(this.latlong);
        this.well_count = JSONlat.length - 1;
        this.calculate();
        this.calculateows();
      }
    );
  }

  // Get the selected Miles from the Radio Button to set the markers on Map
  getMiles(miles: string) {

    while (this.latlong.length > 0) {
      this.latlong.pop();
    }


    if (miles === "One Mile") {
      this.wellapplicationservices.getOneMileJSON().subscribe(
        JSONlat => {
          for (var i = 0; i < JSONlat.length; i++) {
            this.latlong[i] = JSONlat[i],
              error => console.log(error)
          }

          this.firstsixtygas = "0";
          this.firstsixtyoil = "0";
          this.firsttwelvegas = "0";
          this.firsttwelveoil = "0";
          this.firsttwentyfourgas = "0";
          this.firsttwentyfouroil = "0";
          this.lasttwelvegas = "0";
          this.lasttwelveoil = "0";

          this.roifirsttwelve = "0";
          this.roifirsttwentyfour = "0";
          this.roifirstsixty = "0";
          this.roilasttwelve = "0";

          this.well_count = JSONlat.length - 1;
          this.previous = -1;
          this.current = -1;
          this.index = -1;
          this.zoom = 14;
          this.calculate();
          this.calculateows();
          this.store_display(this.current);
        }
      );
    }

    else if (miles === "Three Miles") {
      this.wellapplicationservices.getThreeMilesJSON().subscribe(
        JSONlat => {
          for (var i = 0; i < JSONlat.length; i++) {
            this.latlong[i] = JSONlat[i],
              error => console.log(error)
          }

          this.firstsixtygas = "0";
          this.firstsixtyoil = "0";
          this.firsttwelvegas = "0";
          this.firsttwelveoil = "0";
          this.firsttwentyfourgas = "0";
          this.firsttwentyfouroil = "0";
          this.lasttwelvegas = "0";
          this.lasttwelveoil = "0";

          this.roifirsttwelve = "0";
          this.roifirsttwentyfour = "0";
          this.roifirstsixty = "0";
          this.roilasttwelve = "0";

          this.well_count = JSONlat.length - 1;
          this.previous = -1;
          this.current = -1;
          this.index = -1;
          this.zoom = 12;
          this.calculate();
          this.calculateows();
          this.store_display(this.current);
        }
      );
    }

    else {
      this.wellapplicationservices.getFiveMilesJSON().subscribe(
        JSONlat => {
          for (var i = 0; i < JSONlat.length; i++) {
            this.latlong[i] = JSONlat[i],
              error => console.log(error)
          }
          this.firstsixtygas = "0";
          this.firstsixtyoil = "0";
          this.firsttwelvegas = "0";
          this.firsttwelveoil = "0";
          this.firsttwentyfourgas = "0";
          this.firsttwentyfouroil = "0";
          this.lasttwelvegas = "0";
          this.lasttwelveoil = "0";

          this.roifirsttwelve = "0";
          this.roifirsttwentyfour = "0";
          this.roifirstsixty = "0";
          this.roilasttwelve = "0";

          this.well_count = JSONlat.length - 1;
          this.previous = -1;
          this.current = -1;
          this.index = -1;
          this.zoom = 11;
          this.calculate();
          this.calculateows();
          this.store_display(this.current);
        }
      );

      this.wellapplicationservices.getFiveMilesJSON().subscribe(
        JSONlat => {
          for (var i = 0; i < JSONlat.length; i++) {
            this.latlong[i] = JSONlat[i],
              error => console.log(error)
          }
          this.firstsixtygas = "0";
          this.firstsixtyoil = "0";
          this.firsttwelvegas = "0";
          this.firsttwelveoil = "0";
          this.firsttwentyfourgas = "0";
          this.firsttwentyfouroil = "0";
          this.lasttwelvegas = "0";
          this.lasttwelveoil = "0";

          this.roifirsttwelve = "0";
          this.roifirsttwentyfour = "0";
          this.roifirstsixty = "0";
          this.roilasttwelve = "0";

          this.well_count = JSONlat.length - 1;
          this.previous = -1;
          this.current = -1;
          this.index = -1;
          this.zoom = 12;
          this.calculate();
          this.calculateows();
          this.store_display(this.current);
        }
      );
    }
  }

  // Dynamically changing the Estimated Gross Cash Flow Value
  calculate() {

    this.length = this.well_count;

    let temp1 = 0, temp2 = 0;

    //Initial Calculation of ENCF
    temp1 = (this.oil_price * this.cum_oil);
    temp1 = temp1 - (this.tax * temp1);
    temp2 = (this.gas_price * this.cum_gas);
    temp2 = temp2 - (this.tax_gas * temp2);
    temp1 = temp1 + temp2;
    temp1 = temp1 - ((this.production_expenses / 100) * (temp1));
    this.estimated_gross_cash_flow = (this.partnership_term / 100) * temp1;

    this.green_count = 0;
    this.yellow_count = 0;

    if (this.visit != -1) {
      this.calculatepayout();
    }

    // Setting the Text Color of ENCF if it is greater than 1511111
    if (isNaN(this.estimated_gross_cash_flow)) {
      this.estimated_gross_cash_flow = 0;
    }

    if (this.estimated_gross_cash_flow >= this.partnership_raise) {
      this.textcolor = 'green';
    }

    else {
      this.textcolor = 'red';
    }

    for (var i = 0; i < this.length; i++) {
      // Calculation of all the well when the value of Oil or Gas is changed

      temp1 = (this.oil_price * this.latlong[i].cumoil);
      temp1 = temp1 - (this.tax * temp1);
      temp2 = (this.gas_price * this.latlong[i].cumgas);
      temp2 = temp2 - (this.tax_gas * temp2);

      this.temp_estimated_gross_cash_flow[i] = temp1 + temp2;
      this.temp_estimated_gross_cash_flow[i] = this.temp_estimated_gross_cash_flow[i] - ((this.production_expenses / 100) * (this.temp_estimated_gross_cash_flow[i]));
      this.temp_estimated_gross_cash_flow[i] = (this.partnership_term / 100) * this.temp_estimated_gross_cash_flow[i];

      this.latlong[i].grosscashflow = this.temp_estimated_gross_cash_flow[i];

      // Setting the well color to green and grey based on condition
      if (this.temp_estimated_gross_cash_flow[i] >= this.partnership_raise) {
        this.green_count = this.green_count + 1;
        this.latlong[i].url = "assets/green.png";
      }

      else {
        this.yellow_count = this.yellow_count + 1;
        this.latlong[i].url = "assets/grey.png";
      }
    }

    // Setting the current well to Blur 

    if (this.temp_estimated_gross_cash_flow[this.index] >= this.partnership_raise) {
      this.latlong[this.index].url = "assets/green_blur.png";
    }

    if (this.temp_estimated_gross_cash_flow[this.index] < this.partnership_raise) {
      this.latlong[this.index].url = "assets/grey_blur.png";
    }

    this.calculateows();
    this.getTooltip();
  }

  // Setting the lower Slider Div value to selected marker ENCF
  getTooltip() {
    document.getElementById("tooltipText").style.display = 'inline-block';

    if (this.green_count - 1 != -1) {
      this.tooltip = this.latlong[this.green_count - 1].grosscashflow;
      this.slider_percentage = Math.floor((this.green_count / this.well_count) * 100) - 6 + "%";
    }

    else {
      this.tooltip = "0";
      this.slider_percentage = "0%";
    }
  }

  // Dynamically Calculating the Payout Value and setting the text color to Green or Red
  calculatepayout() {
    this.potential_profit_loss = this.estimated_gross_cash_flow - this.partnership_raise;

    if (this.potential_profit_loss < 0) {
      this.color = 'red';
      if (isNaN(this.potential_profit_loss)) {
        this.potential_profit_loss = 0;
      }
      else {
        this.potential_profit_loss = Math.abs(this.potential_profit_loss);
      }
    }

    else {
      this.color = 'green';
    }

    this.roi_percentage = (Math.floor((this.estimated_gross_cash_flow * 100) / this.partnership_raise)).toString() + "%";

    this.roifirsttwelve = this.calculateROI(this.firsttwelveoil, this.firsttwelvegas);
    this.roifirsttwentyfour = this.calculateROI(this.firsttwentyfouroil, this.firsttwentyfourgas);
    this.roifirstsixty = this.calculateROI(this.firstsixtyoil, this.firstsixtygas);
    this.roilasttwelve = this.calculateROI(this.lasttwelveoil, this.lasttwelvegas);
  }

  // Calculate Table ROI Value
  calculateROI(oil, gas) {
    let temp1, temp2, tempflow;

    temp1 = (this.oil_price * oil);
    temp1 = temp1 - (this.tax * temp1); //848726.1
    temp2 = (this.gas_price * gas);
    temp2 = temp2 - (this.tax_gas * temp2); //0
    temp1 = temp1 + temp2; //848726.1
    temp1 = temp1 - ((this.production_expenses / 100) * (temp1)); //848726.1
    tempflow = (this.partnership_term / 100) * temp1; //477408.43

    return (Math.floor((tempflow * 100) / this.partnership_raise)).toString() + "%";
  }

  // Dynamically changing and calculating OWS Score
  calculateows() {
    this.ows_score = 0;
    this.green_count = 0;
    this.yellow_count = 0;

    for (var i = 0; i < this.length; i++) {
      if (this.latlong[i].grosscashflow >= this.partnership_raise) {
        this.green_count = this.green_count + 1;
      }

      else {
        this.yellow_count = this.yellow_count + 1;
      }

      // Addition of ENCF
      this.ows_score = this.ows_score + this.latlong[i].grosscashflow;
    }

    // Calculating the Average and OWS Score
    this.ows_score = Math.round((this.ows_score * 100) / (this.well_count * this.partnership_raise));
  }

  // Getting Latitude and Longitude Value of the clicked marker
  onMarkerClickLocation(pos: number) {
    this.visit = 1;

    if (this.previous != -1) {
      this.previous = this.current;
    }

    if (pos != this.length) {
      // Setting the clicked marker to Pink Blur and Previous marker to Green Pink or Grey Pink
      this.current = pos;

      // Creating the trail of Wells
      if (pos != this.previous) {

        // Setting the current well to Pin Blur
        if (this.latlong[pos].url == "assets/green.png" || this.latlong[pos].url == "assets/green_yellow.png" || this.latlong[pos].url == "assets/green_blur.png") {
          this.latlong[pos].url = "assets/green_blur.png";
        }

        else {
          this.latlong[pos].url = "assets/grey_blur.png";
        }

        // Setting the previous selected well to Green Pink or Grey Pink
        if (this.previous != -1) {
          if (this.temp_estimated_gross_cash_flow[this.previous] >= this.partnership_raise) {
            this.latlong[this.previous].url = "assets/green_yellow.png";
            this.previous = pos;
          }

          else {
            this.latlong[this.previous].url = "assets/grey_yellow.png";
            this.previous = pos;
          }
        }

        else {
          this.previous = pos;
        }
      }

      this.index = pos;

      this.store_display(this.current);
    }
  }

  // Setting & Getting Slider value 
  myOnFinish(event) {

    if (event.from - 1 == -1) {
      this.oil_price = 0;
      this.gas_price = 0;
    }

    else {
      if (this.oil_price == 0 && this.oil_price == 0) {
        this.oil_price = 60;
        this.gas_price = 3;
      }
    }

    if (event.from - 1 != -1) {
      this.calculate();
      this.calculateows();
      this.calculatepayout();
      this.green_count = event.from;
      this.getTooltip();
      this.visit = 1;
      this.store_display(event.from - 1);

      this.getMarker(event.from - 1);
    }

    else {
      this.calculate();
      this.calculateows();
      this.color = 'red';
      this.potential_profit_loss = 0;
      this.roi_percentage = "0%";
      this.green_count = 0;
      this.getTooltip();
    }

  }

  // Get the Selected Slider Marker
  getMarker(position: number) {

    if (this.index != -1) {
      if (this.latlong[this.index].grosscashflow >= this.partnership_raise) {
        this.latlong[this.index].url = "assets/green.png";
      }

      else {
        this.latlong[this.index].url = "assets/grey.png";
      }
    }

    if (position != -1) {
      if (this.latlong[position].grosscashflow >= this.partnership_raise) {
        this.latlong[position].url = "assets/green_blur.png";
      }

      else {
        this.latlong[position].url = "assets/grey_blur.png";
      }

      this.previous = this.index;
      this.index = position;
      this.current = position;
    }
  }

  // Displaying the details of the selected marker 
  store_display(position: number) {
    if (position != -1) {
      this.api_uwi = this.latlong[position].apiuwi;
      this.operator_name = this.latlong[position].operatorname;
      this.lease_name = this.latlong[position].leasename;
      this.county = this.latlong[position].county;
      this.reservior = this.latlong[position].reservior;
      this.production_status = this.latlong[position].productionstatus;
      this.drill_type = this.latlong[position].drilltype;
      this.first_prod_date = this.latlong[position].firstproddate;
      this.last_prod_date = this.latlong[position].lastproddate;
      this.cum_gas = this.latlong[position].cumgas;
      this.cum_oil = this.latlong[position].cumoil;
      this.measured_depth = this.latlong[position].measureddepth;
      this.state = this.latlong[position].state;
      this.lat = this.latlong[position].latitude;
      this.long = this.latlong[position].longitude;
      this.estimated_gross_cash_flow = this.latlong[position].grosscashflow;

      // Table ROI Calculation
      this.firstsixtygas = this.latlong[position].firstsixtygas;
      this.firstsixtyoil = this.latlong[position].firstsixtyoil;
      this.firsttwelvegas = this.latlong[position].firsttwelvegas;
      this.firsttwelveoil = this.latlong[position].firsttwelveoil;
      this.firsttwentyfourgas = this.latlong[position].firsttwentyfourgas;
      this.firsttwentyfouroil = this.latlong[position].firsttwentyfouroil;
      this.lasttwelvegas = this.latlong[position].lasttwelvegas;
      this.lasttwelveoil = this.latlong[position].lasttwelveoil;

      console.log(this.latlong[position]);

      this.calculatepayout();

      if (this.estimated_gross_cash_flow >= this.partnership_raise) {
        this.textcolor = 'green';
      }

      else {
        this.textcolor = 'red';
      }

    }

    else {
      this.api_uwi = null;
      this.operator_name = "";
      this.lease_name = "";
      this.county = "";
      this.reservior = "";
      this.production_status = "";
      this.drill_type = "";
      this.first_prod_date = "";
      this.last_prod_date = "";
      this.cum_gas = null;
      this.cum_oil = null;
      this.measured_depth = "";
      this.state = "";
      this.lat = null;
      this.long = null;
      this.estimated_gross_cash_flow = 0;
      this.potential_profit_loss = 0;

      this.textcolor = 'red';
    }
  }

  // Setting the Lower Slider Div invisible 
  myOnChange() {
    document.getElementById("tooltipText").style.display = 'none';
  }
}