import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  ProductService from '../task/Test JSON.json';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            socialMediaList : [] = [],
            selectedrow: []=[],
            displayBasic: Boolean = false,
            date1 : null,
            activity_time :[] =[],
            activity_time_table : Boolean = false,
        };
        this.displayBasic = this.onClick.bind(this);
    }

    componentDidMount() {
        // this.productService.getProductsSmall().then(data => this.setState({ products: data }));
        // this.socialMediaList = ProductService.members;
    }

    onClick(){
        this.state.displayBasic=true;
    }
    onHide(name) {
        this.setState({
            displayBasic : false
        });
    }
    renderFooter(name) {
        return (
            <div>
                <Button label="Close" icon="pi pi-check" onClick={() => this.onHide()} autoFocus />
            </div>
        );
    }
    selected_date(picked){
        this.setState({activity_time:[]})
        let pick = picked.target.value
        let pickedd = pick.toString().slice(4).split(' ').slice(0, 3).join(' ');
        console.log("pickd",pickedd);
        if(this.state.selectedrow.activity_periods.length  > 0 ){
           for(let i=0 ; i < this.state.selectedrow.activity_periods.length ; i++){
            let Get_date = this.state.selectedrow.activity_periods[i].start_time;
            let conv_get_date = Get_date.slice(4).split(' ').slice(0, 3).join(' ')
        console.log("conv_get_date",conv_get_date);
        debugger
                if(conv_get_date == pickedd){
                    debugger
                   var newArr = this.state.activity_time;
                   newArr.push(this.state.selectedrow.activity_periods[i]);
                   this.setState({activity_time:newArr})
                }
                else {
                    debugger
                   console.log("false",this.state.activity_time_table);
                }
           }
        }
        else {
            alert("No Activity Record Found");
        }
    }
    render() {
       const activity_time_table = this.state.activity_time_table
        this.socialMediaList = ProductService.members;
        return (
            <div className="p-4">
            <div className="card">
                <DataTable value={this.socialMediaList} header="Employees List" footer="Footer" className="p-datatable-gridlines" selectionMode="single"
                    selection={this.state.selectedrow} onSelectionChange={e => this.setState({selectedrow: e.value}
                        ,this.onClick('displayBasic'))} >
                    <Column field="id"  header="ID"></Column>
                    <Column field="real_name" header="Name"></Column>
                </DataTable>
            </div>
            <Dialog header={this.state.selectedrow.real_name} visible={this.state.displayBasic} style={{ width: '70vw' }} maximizable='displayBasic' maximized='displayBasic' footer={this.renderFooter()} onHide={() => this.onHide()}>
                <div className="row p-3">
                    <div className="col-sm-4 text-left">
                        Employee ID :
                        <div className="pl-1">
                         <InputText id="" value={this.state.selectedrow.id} disabled/>
                        </div>
                    </div>
                    <div className="col-sm-4 text-left">
                        Name :
                        <div className="pl-1">
                          <InputText id="" value={this.state.selectedrow.real_name} disabled/>
                       </div>
                    </div>
                    <div className="col-sm-4 text-left">
                        Time Zone :
                        <div className="pl-1">
                          <InputText id="" value={this.state.selectedrow.tz} disabled/>
                       </div>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-sm-4 text-left">
                        Pick a Date : <h6 class="badge badge-info font_sz">( Please Select Sep 2 For Testing )</h6>
                        <div className="pl-1">
                        <Calendar id="basic" value={this.state.date1} onChange={(e)=> this.selected_date(e)}/>
                        </div>
                    </div> 
                    <div className="col-sm-4 p-3">
                        <DataTable value={this.state.activity_time} header="Activity Log" footer="Footer" emptyMessage="No Data Found" className="p-datatable-gridlines" selectionMode="single" >
                            <Column field="start_time" header="Start Time" ></Column>
                            <Column field="end_time" header="End Time"></Column>
                        </DataTable>   
                    </div>
                </div>
            </Dialog>
        </div>
        )
    }
}
