import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    MovieModule
  ]
})
export class ModulesModule { }
