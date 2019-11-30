package com.meganos.ppmtool.repository;

import com.meganos.ppmtool.domain.ProjectTasks;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTasksRepository extends CrudRepository<ProjectTasks, Long> {
}
