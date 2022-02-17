import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  { path: '', component: BoardListComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
