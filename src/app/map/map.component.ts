import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
  OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from '../shared/navigation.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  latitude: number = 34.059144;
  longitude: number = -117.820072;
  searchControl: FormControl;
  zoom: number = 15;
  markers = [
    {
		  lat: 34.059144,
		  lng: -117.820072,
      label: 'A'
	  }
  ];

  @ViewChild('search') public searchElementRef: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private navService: NavigationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.setCoordsSubscription();

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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadGoogleMaps() {
  }

  setCoordsSubscription() {
    this.subscription = this.navService.markerCoordsChange
      .subscribe(
        (data = []) => {
          if (this.markers[1]) {
            this.markers[1] = {
              lat: data[0],
              lng: data[1],
              label: 'B'
            }
          } else {
          this.markers.push(
            {
              lat: data[0],
              lng: data[1],
              label: 'B'
            })}
          this.latitude = data[0];
          this.longitude = data[1];
          this.zoom = 15;
        });
  }
}
