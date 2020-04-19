import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-form-control';

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  },
    {
    letter: 'D',
    names: ['Delaware']
  }, {
    letter: 'F',
    names: ['Florida']
  }, {
    letter: 'G',
    names: ['Georgia']
  }, {
    letter: 'H',
    names: ['Hawaii']
  },
    {
    letter: 'I',
    names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  }, {
    letter: 'K',
    names: ['Kansas', 'Kentucky']
  }, {
    letter: 'L',
    names: ['Louisiana']
  }, {
    letter: 'M',
    names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
      'Minnesota', 'Mississippi', 'Missouri', 'Montana']
  },
    {
    letter: 'N',
    names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota']
  }, {
    letter: 'O',
    names: ['Ohio', 'Oklahoma', 'Oregon']
  }, {
    letter: 'P',
    names: ['Pennsylvania']
  }, {
    letter: 'R',
    names: ['Rhode Island']
  },
    {
    letter: 'S',
    names: ['South Carolina', 'South Dakota']
  }, {
    letter: 'T',
    names: ['Tennessee', 'Texas']
  }, {
    letter: 'U',
    names: ['Utah']
  }, {
    letter: 'V',
    names: ['Vermont', 'Virginia']
  }, {
    letter: 'W',
    names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  }];

  filteredStreets: Observable<String[]>;

  filteredOption:Observable<String[]>;

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.filteredOption=this.myControl.valueChanges.pipe(startWith(''),
       map(value => this.match1(value))
      );
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.match(value))
    );

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  private match(value:String):String[]{

    const filterValue=value.toLocaleLowerCase();
    return this.streets.filter(option => option.toLocaleLowerCase().includes(filterValue))
  }

  // private match(value: string): string[] {
  //   const filterValue = this._normalizeValue(value);
  //   return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  // }
  //
  // private _normalizeValue(value: string): string {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }


  private match1(value:String):String[]{

    const filterValue=value.toLocaleLowerCase();
    return this.options.filter(option => option.toLocaleLowerCase().includes(filterValue))
  }

}
