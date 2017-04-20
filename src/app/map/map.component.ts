import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';


import { NavigationService } from '../shared/navigation.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number = 34.059144;
  longitude: number = -117.820072;
  searchControl: FormControl;
  zoom: number = 15;

  @ViewChild('search') public searchElementRef: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private navService: NavigationService,
              private route: ActivatedRoute,
              private router: Router) { }

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
          this.zoom = 15;
          console.log(place);

          this.navService.setNewLocation(place);

          this.navService.setNewCoordinates(
                place.geometry.location.lat(),
                place.geometry.location.lng()
              );

          this.router.navigate(['/']);
          this.navService.resetViews();
        });
      });
    });
  }
}
