package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentReport {

    private String name;
    private String fee;
    private String date;
    private String paymentcount;
    private String totalamount;
}
