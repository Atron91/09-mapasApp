import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styles: [
    ` 
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }
    `

  ]
})
export class MarcadorComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-3.7018280164312527, 40.31865091284465 ];

  //Arreglo de marcador
  marcadores: MarcadorColor[] = [];


  constructor() { }

  ngAfterViewInit(): void {

    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-3.7018280164312527, 40.31865091284465 ], // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
      });

      this.leerLocalStorage();

      // const markerHtml: HTMLElement = document.createElement('div');
      // markerHtml.innerHTML = 'Hola Mundo';

      // new mapboxgl.Marker({
      //   element: markerHtml
      // })
      //   .setLngLat( this.center )
      //   .addTo( this.mapa );
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat( this.center )
    .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage()

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
    
  }
  
  irMarcador( marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr: MarcadorColor[] = [];

      this.marcadores.forEach( m => {
        const color = m.color;
        const { lng, lat } = m.marker!.getLngLat();

        lngLatArr.push({
          color: color,
          centro: [lng, lat]
          
        });
      })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );
  }

  leerLocalStorage(){

    if (!localStorage.getItem('marcadores') ){
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat( m.centro! )
      .addTo( this.mapa );

    this.marcadores.push({
      marker: newMarker,
      color: m.color

    });

    newMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });


    });
  }

  borrarMarcador( i: number ) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
