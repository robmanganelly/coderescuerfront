import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CheatsheetComponent } from './cheatsheet/cheatsheet.component';
import { ProbsheetComponent } from './probsheet/probsheet.component';
import { SolutionComponent } from './solution/solution.component';
import { EditSolutionComponent } from './edit-solution/edit-solution.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LangResolver } from './resolvers/lang.resolver';
import { ProbByLangIdResolver } from './resolvers/prob-by-lang-id.resolver';
import { TextAreaAutoResizeDirective } from './directives/text-area-auto-resize.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SolutionResolver } from './resolvers/solution.resolver';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SolutionContainerComponent } from './solution-container/solution-container.component';
import {MatPaginatorModule} from '@angular/material/paginator';

const appRoutes: Routes = [
  { path: 'index', component: MainpageComponent, resolve:{languages: LangResolver} },
  { path: 'auth', component: AuthComponent },
  { path: 'tricks/:id', component: CheatsheetComponent, resolve: { problems: ProbByLangIdResolver } },
  { path: 'problem/:id/solutions', component: SolutionContainerComponent, resolve: { solutions: SolutionResolver }},
  { path: 'edit', component: EditContainerComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found'}

]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainpageComponent,
    CheatsheetComponent,
    ProbsheetComponent,
    SolutionComponent,
    EditSolutionComponent,
    EditContainerComponent,
    NotFoundComponent,
    TextAreaAutoResizeDirective,
    SolutionContainerComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
