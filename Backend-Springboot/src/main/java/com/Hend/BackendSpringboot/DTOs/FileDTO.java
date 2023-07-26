package com.Hend.BackendSpringboot.DTOs;

public class FileDTO {

    private Integer id;
    private String name;
    private String type;
    private Long size;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    // Constructors, getters, and setters (or use Lombok annotations)
}
