package nic.esignature.services;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;

@Service
public class SignatureService {
    public String generateSignature(String base64Document)
            throws Exception {

        MessageDigest digest =
                MessageDigest.getInstance("SHA-256");

        byte[] hash =
                digest.digest(
                        base64Document.getBytes());

        StringBuilder hexString =
                new StringBuilder();

        for (byte b : hash) {
            hexString.append(
                    String.format("%02x", b));
        }

        return hexString.toString();
    }
}
