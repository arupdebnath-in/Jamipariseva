package nic.esignature.controller;

import nic.esignature.dto.KhatianRequest;
import nic.esignature.dto.KhatianResponse;
import nic.esignature.dto.SignResponse;
import nic.esignature.entity.Document;
import nic.esignature.repository.DocumentRepository;
import nic.esignature.services.KhatianService;
import nic.esignature.services.SignatureService;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/documents")
public class DocumentController {


    private final DocumentRepository repository;
    private final KhatianService khatianService;
    private final SignatureService signatureService;

    public DocumentController(
            DocumentRepository repository,
            KhatianService khatianService,
            SignatureService signatureService) {

        this.repository = repository;
        this.khatianService = khatianService;
        this.signatureService = signatureService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public SignResponse uploadPdf(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        if (file.isEmpty()) {
            throw new RuntimeException("No file uploaded");
        }

        if (!"application/pdf".equals(file.getContentType())) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        Document document = new Document();

        document.setDocumentId(UUID.randomUUID());
        document.setFileName(file.getOriginalFilename());
        document.setMimeType(file.getContentType());
        document.setUploadedAt(LocalDateTime.now());

        String base64 =
                Base64.getEncoder()
                        .encodeToString(file.getBytes());



        repository.save(document);

        String signature =
                signatureService.generateSignature(base64);

        document.setSignature(signature);

        repository.save(document);

        SignResponse response =
                new SignResponse();

        response.setMessage(
                "Document signed successfully");

        response.setSignature(signature);

        response.setStatus("SUCCESS");

        return response;
    }

    @PostMapping("/sign-khatian")
    public SignResponse signKhatian(
            @RequestBody KhatianRequest request
    ) throws Exception {

        KhatianResponse khatianResponse =
                khatianService.getKhatianDocument(
                        request.getKhatianNo(),
                        request.getVillageCode(),
                        request.getDistrictCode()
                );

        Document document = new Document();

        document.setDocumentId(UUID.randomUUID());
        document.setFileName(
                khatianResponse.getFileName());

        document.setMimeType("application/pdf");
        document.setUploadedAt(LocalDateTime.now());

        repository.save(document);

        String signature =
                signatureService.generateSignature(
                        khatianResponse.getBase64Document());

        document.setSignature(signature);

        repository.save(document);

        SignResponse response =
                new SignResponse();

        response.setMessage(
                "Document signed successfully");

        response.setSignature(signature);

        response.setStatus("SUCCESS");

        return response;
    }


}
