import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { BoardResolver } from './pages/board/board-resolver.service';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  { path: '', component: BoardListComponent },
  {
    path: 'boards/:id',
    component: BoardComponent,
    resolve: {
      board: BoardResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
