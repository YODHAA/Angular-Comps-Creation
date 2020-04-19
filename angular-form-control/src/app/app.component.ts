import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-form-control';

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  
  filteredOption:Observable<String[]>;

  ngOnInit(){
    this.filteredOption=this.myControl.valueChanges.pipe(startWith(''),
       map(value => this.match(value))
      );
  }

  private match(value:String):String[]{

    const filterValue=value.toLocaleLowerCase();
    return this.options.filter(option => option.toLocaleLowerCase().includes(filterValue))
  }

}
