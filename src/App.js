import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './App.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';



export default class App extends SampleBase {
    constructor() {
        super(...arguments);
        
        this.data = extend([],JSON.parse(localStorage.getItem('events'))||[], null, true);
        this.onEventRendered=this.onEventRendered.bind(this);
      }
    onEventRendered(args) {
      console.log(args)
      console.log(this.data)
      // let data=this.data
      // data.push(args.data)
      console.log(1)
      localStorage.setItem('events',JSON.stringify(this.data))
        let categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        }
        else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
    componentDidMount(){

    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px'  ref={(t) =>{this.scheduleObj = t;console.log(t);localStorage.setItem('events',JSON.stringify(t.eventsData))}} eventSettings={{ dataSource: this.data}} eventRendered={this.onEventRendered}>
              
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
      </div>);
    }
}