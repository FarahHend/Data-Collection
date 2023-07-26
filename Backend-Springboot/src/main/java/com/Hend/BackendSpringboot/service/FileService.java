package com.Hend.BackendSpringboot.service;

import com.Hend.BackendSpringboot.DTOs.FileDTO;
import com.Hend.BackendSpringboot.model.File;
import com.Hend.BackendSpringboot.model.User;
import com.Hend.BackendSpringboot.repository.FileRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    private  FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    public File saveAttachment(MultipartFile multipartFile, User user) throws Exception {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String fileType = multipartFile.getContentType();
        Long fileSize = multipartFile.getSize();
        byte[] data = multipartFile.getBytes();
        try {
            if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence "
                        + fileName);
            }

            File attachment
                    = new File(fileName,
                    fileType,
                    fileSize,
                    data,
                    user);
            return fileRepository.save(attachment);

        } catch (Exception e) {
            throw new Exception("Could not save File: " + fileName);
        }
    }


    public File getAttachment(String fileId) throws Exception {
        return fileRepository
                .findById(fileId)
                .orElseThrow(
                        () -> new Exception("File not found with Id: " + fileId));
    }

    //public List<File> getAllFiles() {
        //return fileRepository.findAll();
    //}

    public List<FileDTO> getAllFiles() {
        List<File> files = fileRepository.findAll();
        List<FileDTO> fileDTOs = new ArrayList<>();
        for (File file : files) {
            FileDTO fileDTO = new FileDTO();
            fileDTO.setId(file.getId());
            fileDTO.setName(file.getFileName());
            fileDTO.setType(file.getFileType());
            fileDTO.setSize(file.getFileSize());
            fileDTOs.add(fileDTO);
        }
        return fileDTOs;
    }

    public void deleteFileById(String fileId) {
        fileRepository.deleteById(fileId);
    }
}

