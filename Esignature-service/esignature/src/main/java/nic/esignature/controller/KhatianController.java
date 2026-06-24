package nic.esignature.controller;

import nic.esignature.dto.KhatianRequest;
import nic.esignature.dto.KhatianResponse;
import nic.esignature.entity.KhatianDocument;
import nic.esignature.repository.KhatianDocumentRepository;
import nic.esignature.services.KhatianService;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/khatian_services/esign")
public class KhatianController {


    private final KhatianService khatianService;
    private final KhatianDocumentRepository repository;

    public KhatianController(
            KhatianService khatianService,
            KhatianDocumentRepository repository) {

        this.khatianService = khatianService;
        this.repository = repository;
    }

    @PostMapping("/frskhatian")
    public KhatianResponse getKhatianDocument(
            @RequestBody KhatianRequest request) {

        return khatianService.getKhatianDocument(
                request.getKhatianNo(),
                request.getVillageCode(),
                request.getDistrictCode()
        );
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Map<String, Object> uploadKhatian(
            @RequestParam("file") MultipartFile file,
            @RequestParam("khatianNo") String khatianNo,
            @RequestParam("villageCode") String villageCode,
            @RequestParam("districtCode") String districtCode
    ) throws Exception {

        if (file.isEmpty()) {
            throw new RuntimeException("No file uploaded");
        }

        if (!"application/pdf".equals(file.getContentType())) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        KhatianDocument document =
                new KhatianDocument();

        document.setKhatianNo(khatianNo);
        document.setVillageCode(villageCode);
        document.setDistrictCode(districtCode);
        document.setFileName(file.getOriginalFilename());
        document.setDocumentContent(file.getBytes());

        repository.save(document);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "PDF stored successfully");

        response.put(
                "id",
                document.getId());

        response.put(
                "fileName",
                document.getFileName());

        response.put(
                "khatianNo",
                document.getKhatianNo());

        return response;
    }


}
