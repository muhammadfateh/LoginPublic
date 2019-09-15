package com.meganos.ppmtool.service;

import com.meganos.ppmtool.domain.Project;
import com.meganos.ppmtool.exceptions.ProjectIdException;
import com.meganos.ppmtool.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID "+project.getProjectIdentifier().toUpperCase()+" already exists");
        }
    }

    public Project findProjectByIdentifier(String iden){
        Project project=projectRepository.findByProjectIdentifier(iden.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project ID "+iden.toUpperCase() +" does not exist");
        }
        return project;
    }
    public Iterable<Project> getProjects(){
        return projectRepository.findAll();
    }
}
