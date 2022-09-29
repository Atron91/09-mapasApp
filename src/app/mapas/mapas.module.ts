import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MinMapaComponent } from './components/min-mapa/min-mapa.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadorComponent } from './pages/marcador/marcador.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';


@NgModule({
  declarations: [
    MinMapaComponent,
    FullScreenComponent,
    MarcadorComponent,
    ZoomRangeComponent,
    PropiedadesComponent,
    
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
