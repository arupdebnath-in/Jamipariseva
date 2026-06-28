package nic.esignature.config;
import nic.esignature.entity.KhatianDocument;
import nic.esignature.repository.KhatianDocumentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class DataLoader implements CommandLineRunner{
    private final KhatianDocumentRepository repository;

    public DataLoader(KhatianDocumentRepository repository) {
        this.repository = repository;
}
    @Override
    public void run(String... args) throws Exception {

        // Prevent duplicate insertion
        if (repository.count() > 0) {
            System.out.println("Khatian data already exists.");
            return;
        }
        loadPdf("khatian1.pdf", "121", "922855", "272");
        loadPdf("khatian2.pdf", "122", "922842", "272");
        loadPdf("khatian3.pdf", "123", "922843", "272");
        loadPdf("khatian4.pdf", "124", "922836", "272");
        loadPdf("khatian5.pdf", "125", "271862", "272");

        System.out.println("Sample Khatian data loaded successfully.");
    }
    private void loadPdf(
            String pdfName,
            String khatianNo,
            String villageCode,
            String districtCode) throws IOException {

        ClassPathResource resource =
                new ClassPathResource("sample-pdfs/" + pdfName);

        KhatianDocument document =
                new KhatianDocument();

        document.setKhatianNo(khatianNo);
        document.setVillageCode(villageCode);
        document.setDistrictCode(districtCode);
        document.setFileName(pdfName);
        document.setDocumentContent(
                resource.getInputStream().readAllBytes());

        repository.save(document);
    }
}
