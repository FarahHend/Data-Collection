package com.Hend.BackendSpringboot.controller;

import com.Hend.BackendSpringboot.DTOs.FileDTO;
import com.Hend.BackendSpringboot.ResponseData;
import com.Hend.BackendSpringboot.model.File;
import com.Hend.BackendSpringboot.model.User;
import com.Hend.BackendSpringboot.repository.UserRepository;
import com.Hend.BackendSpringboot.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
public class FileController {

    private FileService fileService;
    private final UserRepository userRepository;

    @Autowired
    public FileController(FileService fileService, UserRepository userRepository) {
        this.fileService = fileService;
        this.userRepository = userRepository;
    }
    @PostMapping("/upload")
    public ResponseEntity<ResponseData> uploadFile(@RequestParam("file") MultipartFile multipartFile, @RequestParam("userId") Integer userId) throws Exception {
        // Find the user by userId from the database (You may need to implement this method in your UserService)
        Optional<User> userOptional = userRepository.findById_user(userId);

        User user = userOptional.get();

        // Save the file and get the returned File object
        File savedFile = fileService.saveAttachment(multipartFile, user);

        // Create the download URL for the uploaded file
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/file-controller/download/")
                .path(savedFile.getId().toString())
                .toUriString();

        // Create a response with the necessary file details
        ResponseData response = new ResponseData(savedFile.getFileName(),
                downloadURL,
                savedFile.getFileType(),
                savedFile.getFileSize());

        // Return the response with a success status
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileId) throws Exception {
        File attachment = null;
        attachment = fileService.getAttachment(fileId);
        return  ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + attachment.getFileName()
                                + "\"")
                .body(new ByteArrayResource(attachment.getData()));
    }

    //@GetMapping("/files")
    //public ResponseEntity<List<File>> getAllFiles() {
        //List<File> files = fileService.getAllFiles();
       // return new ResponseEntity<>(files, HttpStatus.OK);
   // }

    @GetMapping("/files/user/{userId}")
    public ResponseEntity<List<FileDTO>> getFilesByUserId(@PathVariable Integer userId) {
        List<FileDTO> fileDTOs = fileService.getFilesByUserId(userId);
        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @GetMapping("/files/search")
    public ResponseEntity<List<FileDTO>> getFilesByFile_nameContainingIgnoreCase(@RequestParam String fileName) {
        List<FileDTO> fileDTOs = fileService.getFilesByFile_nameContainingIgnoreCase(fileName);
        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileDTO>> getAllFiles() {
        List<FileDTO> fileDTOs = fileService.getAllFiles();
        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @DeleteMapping("/delete_file/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileId) {
        try {
            fileService.deleteFileById(fileId);
            return new ResponseEntity<>("File deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
