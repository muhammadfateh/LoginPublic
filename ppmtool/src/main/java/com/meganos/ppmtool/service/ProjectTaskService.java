package com.meganos.ppmtool.service;

import com.meganos.ppmtool.domain.Backlog;
import com.meganos.ppmtool.domain.ProjectTask;
import com.meganos.ppmtool.repository.BacklogRepository;
import com.meganos.ppmtool.repository.ProjectTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {
    @Autowired
    private ProjectTasksRepository projectTasksRepository;
    @Autowired
    private BacklogRepository backlogRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        //Exception: Project not found

        //PTs to be added to a specific project, project!=null and BL exists
        Backlog backlog=backlogRepository.findByProjectIdentifier(projectIdentifier);
        //set the BL to PT
        projectTask.setBacklog(backlog);
        //we want our ProjectTask.projectSequence to be like this: IDPRO-1, IDPRO-2 ..... 100, 101
        Integer backlogSequence=backlog.getPTSequence();
        //Update the Backlog sequence
        backlogSequence++;

        //Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //Initial Priority when priority==null
        if(projectTask.getPriority() == null || projectTask.getPriority() == 0){
            projectTask.setPriority(3);
        }
        //Initial Status when status==null
        if(projectTask.getStatus() == "" || projectTask.getStatus()==null){
            projectTask.setStatus("TO_DO");
        }
        return projectTasksRepository.save(projectTask);
    }
}
