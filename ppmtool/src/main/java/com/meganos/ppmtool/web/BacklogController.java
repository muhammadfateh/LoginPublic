package com.meganos.ppmtool.web;

import com.meganos.ppmtool.domain.ProjectTask;
import com.meganos.ppmtool.repository.ProjectTasksRepository;
import com.meganos.ppmtool.service.MapValidationErrorService;
import com.meganos.ppmtool.service.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addPTToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result, @PathVariable String backlog_id){
        //if there is error, returns back the object with all errors occurred
        ResponseEntity<?> errorResponse=mapValidationErrorService.mapValidationService(result);
        if(errorResponse != null) return errorResponse;

        ProjectTask projectTask1=projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }
}
