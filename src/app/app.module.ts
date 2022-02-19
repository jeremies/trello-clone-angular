import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardDndListComponent } from './components/board-dnd-list/board-dnd-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardListComponent,
    HeaderComponent,
    BoardDndListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
