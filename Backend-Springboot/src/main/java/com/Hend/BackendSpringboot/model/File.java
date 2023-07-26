package com.Hend.BackendSpringboot.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "File")
public class File {

    @Id
    @GeneratedValue
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id_file")
    private Integer id_file;

    @Column(name = "file_name")
    private String file_name;

    @Column(name = "file_type")
    private String file_type;

    //@Column(name = "path")
    //private String path;

    @Column(name = "file_size")
    private Long file_size;

    @Lob
    private byte[] data;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    //public File(String file_name, String file_type, Long file_size, String path, User user) {
       // this.file_name = file_name;
        //this.file_type = file_type;
        //this.path = path;
        //this.file_size = file_size;
        //this.data = data;
        //this.user = user;
    //}
    public File(String file_name, String file_type, Long fileSize, byte[] data, User user) {
        this.file_name = file_name;
        this.file_type = file_type;
        this.file_size = fileSize;
        this.data = data;
        this.user = user;
    }



    // Getters and setters

    public User getUser() {
       return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public String getFileName() {
        return file_name;
    }


    public String getFileType() {
        return file_type;
    }

    public Integer getId() {
        return id_file;
    }

    public long getFileSize() {
        return file_size;
    }
}
