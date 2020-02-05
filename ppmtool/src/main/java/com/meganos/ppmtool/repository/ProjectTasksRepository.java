package com.meganos.ppmtool.repository;

import com.meganos.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTasksRepository extends CrudRepository<ProjectTask, Long> {
}
