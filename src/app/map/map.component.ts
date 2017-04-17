import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public latitude: number = 51.5033640;
  public longitude: number = -0.1276250;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search') public searchElementRef: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
}
