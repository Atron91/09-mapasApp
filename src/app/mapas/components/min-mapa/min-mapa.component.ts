import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-min-mapa',
  templateUrl: './min-mapa.component.html',
  styles: [
    `
    div {
      width: 100%;
      height: 150px;
      margin: 0px;
    }
    `
  ]
})
export class MinMapaComponent implements AfterViewInit {

 @Input() lngLat: [ number, number ] = [0,0];
 @ViewChild('mapa') divMapa!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
      // projection: 'globe' // display the map as a 3D globe
      });

      new mapboxgl.Marker()
        .setLngLat( this.lngLat )
        .addTo( mapa );
  }

}
