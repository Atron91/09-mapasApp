import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;    
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-3.7018280164312527, 40.31865091284465 ];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  
  ngAfterViewInit(): void {

    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-3.7018280164312527, 40.31865091284465 ], // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
      });

      this.mapa.on('zoom', (ev) => {
        this.zoomLevel = this.mapa.getZoom();
      });

      this.mapa.on('zoomend', (ev) => {
        this.zoomLevel = this.mapa.getZoom();
      });

      //Movimiento del mapa
      this.mapa.on('move', (event) => {
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [lng, lat];
      })
  }

  ZoomOut(){
    this.mapa.zoomOut();
  }

  ZoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ){
    this.mapa.zoomTo( Number(valor) );
  }

}
