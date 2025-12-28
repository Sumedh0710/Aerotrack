import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../../../../core/services/maintenance.service';
import { MaintenanceTask, TaskStatus } from '../../../../core/models/maintenance-task.model';
import { AircraftService } from '../../../../core/services/aircraft.service';

@Component({
    selector: 'app-maintenance-list',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './maintenance-list.component.html'
})
export class MaintenanceListComponent implements OnInit {
  term = '';
  filterStatus: TaskStatus | '' = ''; 
  onlyEmergency= false;
  tasks: MaintenanceTask[] = [];
  statuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
  aircraftIDs: string[] = [];
  selectedAircraftForEmergency = '';

  constructor(private svc: MaintenanceService, private aircraftSvc: AircraftService) {}

  ngOnInit() {
    this.refresh();
    this.svc.list().subscribe(() => this.refresh());
    this.aircraftSvc.list().subscribe(() => {
    this.aircraftIDs = this.aircraftSvc.ids();
    });
  }

  refresh() {
    this.tasks = this.svc.filter(this.term, this.filterStatus || undefined);
    this.tasks = this.tasks.slice().sort((a, b) => {
      if (a.isEmergency && !b.isEmergency) return -1;
      if (!a.isEmergency && b.isEmergency) return 1;
      return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
    });
  }

  clearFilters() {
    this.term = '';
    this.filterStatus = '';
    this.refresh();
  }

  start(id: string) {
    this.svc.setStatus(id, 'IN_PROGRESS');
  }

  complete(id: string) {
    this.svc.setStatus(id, 'COMPLETED');
  }

  remove(id: string) {
    if (confirm(`Delete task ${id}?`)) this.svc.remove(id);
  }

  createEmergency() {
    if (!this.selectedAircraftForEmergency) {
      alert('Select an AircraftID for emergency');
      return;
    }
    // ✅ Add emergency flag here
    const task = this.svc.createEmergency(this.selectedAircraftForEmergency);
    task.isEmergency = true; // <-- highlight key
    this.svc.add(task);
  }

  statusClass(status: TaskStatus): { [klass: string]: boolean } {
    return {
      'in-progress': status === 'IN_PROGRESS',
      'completed': status === 'COMPLETED',
      'pending': status === 'PENDING'
    };
  }

  
}
