package project.backend.entities;

import java.sql.Date;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
// import project.backend.entities.PackageOwned;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String gmail;
    private String avatarURL;
    private String password;
    private String provideId;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    @Enumerated(EnumType.STRING)
    @Column(name = "package_owned")
    private PackageOwned packageOwned = PackageOwned.FREE;

    @Column(name = "end_date_package")
    private Date endDatePackage;

    @Column(name = "free_access")
    private Integer freeAccess;

    private LocalDateTime createAt = LocalDateTime.now();

    private LocalDateTime changePassAt;

}
