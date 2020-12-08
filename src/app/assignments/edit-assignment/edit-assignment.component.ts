import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;
  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    const id = + this.route.snapshot.params.id;
    this.assignmentService.getAssignment(id)
    .subscribe(ass => this.assignment = ass);

    const paramsHTTP = this.route.snapshot.queryParams;
    const fragment = this.route.snapshot.queryParams.fragment;
    console.log('Query Params');
    console.log(paramsHTTP);
    console.log('Fragment');
    console.log(fragment);
  }

  onSaveAssignment(event){
    event.preventDefault();

    this.assignmentService.updateAssignment(this.assignment)
    .subscribe(message => console.log(message));

    //retour page d'accueil 

    this.router.navigate(['home']);
  }
}
