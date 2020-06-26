package com.guilbt.tradingsad.service.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

public class SimpleRestClient {
    private static final int defaultTimeout = 60000;
    private final String server;
    private final RestTemplate rest;
    private final HttpHeaders headers;

    public SimpleRestClient(String server, int timeoutInMillis, Map<String, String> addHeaders) {
        Assert.notNull(server, "Server parameter can't be null");
        this.server = server;
        this.rest = new RestTemplate(
                new BufferingClientHttpRequestFactory(
                        getClientHttpRequestFactory(timeoutInMillis)
                )
        );
        this.headers = new HttpHeaders();
        this.headers.add("Content-Type", "application/json");
        this.headers.add("Accept", "application/json");
        if (addHeaders != null) {
            for (Map.Entry<String, String> header : addHeaders.entrySet()) {
                this.headers.add(header.getKey(), header.getValue());
            }
        }
    }

    public SimpleRestClient(String server, Map<String, String> addHeaders) {
        this(server, defaultTimeout, addHeaders);
    }

    public SimpleRestClient(Map<String, String> addHeaders) {
        this("", defaultTimeout, addHeaders);
    }

    public SimpleRestClient() {
        this("", defaultTimeout, null);
    }

    public SimpleRestClient(String server) {
        this(server, defaultTimeout, null);
    }

    private SimpleClientHttpRequestFactory getClientHttpRequestFactory(int timeoutinMillis) {
        SimpleClientHttpRequestFactory clientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        clientHttpRequestFactory.setConnectTimeout(timeoutinMillis);
        clientHttpRequestFactory.setReadTimeout(timeoutinMillis);
        return clientHttpRequestFactory;
    }

    public <E> ResponseEntity<E> get(String uri, Class<E> returnObjectClass, HttpHeaders addHeaders) {
        addHeaders.addAll(headers);
        HttpEntity<String> requestEntity = new HttpEntity<>("", addHeaders);
        return rest.exchange(server + uri, HttpMethod.GET, requestEntity, returnObjectClass);
    }

    public <E, T> ResponseEntity<E> post(String endpoint, T json, Class<E> returnObjectClass, HttpHeaders addHeaders) {
        addHeaders.addAll(headers);
        HttpEntity<T> requestEntity = new HttpEntity<>(json, addHeaders);
        String URL = server + endpoint;
        return rest.exchange(URL, HttpMethod.POST, requestEntity, returnObjectClass);
    }

    public <E, T> ResponseEntity<E> put(String uri, T json, Class<E> returnObjectClass, HttpHeaders addHeaders) {
        addHeaders.addAll(headers);
        HttpEntity<T> requestEntity = new HttpEntity<>(json, addHeaders);
        return rest.exchange(server + uri, HttpMethod.PUT, requestEntity, returnObjectClass);
    }

    public <E> ResponseEntity<E> delete(String uri, Class<E> returnObjectClass, HttpHeaders addHeaders) {
        addHeaders.addAll(headers);
        HttpEntity<String> requestEntity = new HttpEntity<>("", addHeaders);
        return rest.exchange(server + uri, HttpMethod.DELETE, requestEntity, returnObjectClass);
    }


    public <E> ResponseEntity<E> get(String uri, Class<E> returnObjectClass) {
        return this.get(uri, returnObjectClass, new HttpHeaders());
    }

    public <E, T> ResponseEntity<E> post(String endpoint, T json, Class<E> returnObjectClass) {
        return this.post(endpoint, json, returnObjectClass, new HttpHeaders());
    }

    public <E, T> ResponseEntity<E> put(String uri, T json, Class<E> returnObjectClass) {
        return this.put(uri, json, returnObjectClass, new HttpHeaders());
    }

    public <E> ResponseEntity<E> delete(String uri, Class<E> returnObjectClass) {
        return this.delete(uri, returnObjectClass, new HttpHeaders());
    }

    public ResponseEntity<String> get(String uri) {
        return this.get(uri, String.class);
    }

    public <T> ResponseEntity<String> post(String uri, T json) {
        return this.post(uri, json, String.class);
    }

    public <T> ResponseEntity<String> put(String uri, T json) {
        return this.put(uri, json, String.class);
    }

    public ResponseEntity<String> delete(String uri) {
        return this.delete(uri, String.class);
    }
}
