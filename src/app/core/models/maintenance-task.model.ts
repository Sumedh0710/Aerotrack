
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export interface MaintenanceTask{ 
    taskID: string; 
    aircraftID:string; 
    scheduledDate: string;
    status: TaskStatus; 
    isEmergency?: boolean;
    priority?: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; 
    createdAt?: string;              
    dueAt?: string;                  
}



