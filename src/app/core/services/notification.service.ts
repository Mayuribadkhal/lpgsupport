import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }

	    Errmsg (Message) {
	       $.bigBox({
	            title: Message,
	            color: "#C46A69",
	            icon: "fa fa-warning shake animated",
	            timeout: 6000
	        });
	    }

	    Success(Message) {
		    $.bigBox({
		        title: Message,
		        color: "#296191",
		        icon: "fa fa-thumbs-up animated bounce ",
		        timeout: "4000"
		       });
	  	}

      Success_time(Message,time) {
	     $.bigBox({
	        title: Message,
	        color: "#296191",
	        icon: "fa fa-thumbs-up animated bounce ",
	        timeout: time
	       });
	    }


  }
