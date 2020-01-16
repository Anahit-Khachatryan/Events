import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() deleteClose = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  onDeleteClose() {
    this.deleteClose.emit();
  }
  onClose() {
    this.close.emit()
  }


}
