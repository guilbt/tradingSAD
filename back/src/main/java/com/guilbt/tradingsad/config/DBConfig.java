package com.guilbt.tradingsad.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
//@EnableJpaRepositories(basePackageClasses = arrayOf(IssueEventRepository::class))
//@EntityScan(basePackageClasses = arrayOf(IssueEvent::class))
@EnableTransactionManagement
public class DBConfig {
}
