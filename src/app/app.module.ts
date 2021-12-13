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


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

const appRoutes: Routes = [
  { path: '', component: MainpageComponent, resolve:{languages: LangResolver} },
  { path: 'tricks/:id', component: CheatsheetComponent, resolve: { problems: ProbByLangIdResolver } },
  { path: 'solution', component: SolutionComponent},
  { path: 'edit', component: EditContainerComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found'}

]
@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    CheatsheetComponent,
    ProbsheetComponent,
    SolutionComponent,
    EditSolutionComponent,
    EditContainerComponent,
    NotFoundComponent,
    TextAreaAutoResizeDirective,
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
    MatSnackBarModule,
    MatToolbarModule,
    MatGridListModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
