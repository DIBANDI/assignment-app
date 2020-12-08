import { Injectable } from '@angular/core';
import {Assignment} from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules....
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService:LoggingService) { }

  assignments:Assignment[] = [
    {
      id:1,
      nom:"TP WebComponents INTENSE",
      dateDeRendu:new Date('2020-11-17'),
      rendu:true
    },
    {
      id:2,
      nom:"TP Angular INTENSE",
      dateDeRendu:new Date('2020-12-03'),
      rendu:false
    },
    {
      id:3,
      nom:"TP React INTENSE",
      dateDeRendu:new Date('2021-01-10'),
      rendu:false
    },
  ];

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  getNewId():number {
    return this.assignments.length+1;
  }
  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);

    this.logginService.log(assignment.nom, "ajouté");

    return of("assignemt ajouté");
  }

  getAssignment(id) : Observable<Assignment>{
    return of(this.assignments.find(ass => (ass.id ===id)));
  }
  updateAssignment(assignment:Assignment):Observable<string> {
    this.assignments.forEach((a, index) => {
      if(a === assignment) {
        this.assignments[index] = assignment;
      }
    });
    this.logginService.log(assignment.nom, "modifié");

    /*
    let pos = this.assignments.indexOf(assignment);
    this.assignments[pos] = assignment;
    */

    return of("assignmentt modifié");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé");

    return of("assignment supprimé");
  }
}
