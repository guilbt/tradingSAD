package com.guilbt.cadastropessoas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
//@EnableJpaRepositories(basePackageClasses = arrayOf(IssueEventRepository::class))
//@EntityScan(basePackageClasses = arrayOf(IssueEvent::class))
@EnableTransactionManagement
public class DBConfig {
}
