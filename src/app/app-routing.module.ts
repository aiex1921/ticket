import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




export const routes: Routes = [
  { path: 'auth',
    loadChildren:() => import('./pages/auth/auth.module').then(m =>m.AuthModule)
  },

  { path: 'ticket',
    loadChildren:() => import('./pages/tickets/tickets.module').then(m =>m.TicketsModule)
  },

  { path: '**',
    redirectTo:'auth',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
