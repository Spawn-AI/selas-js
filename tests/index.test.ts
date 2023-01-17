// import the postJob function from "../src/index"
import {
  createSelasClient,
  SelasClient,
  StableDiffusionConfig,
} from "../src/index";

import * as dotenv from "dotenv";

dotenv.config();

describe("testing selas-js", () => {
  let selas: SelasClient;

  test("creation of client", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    expect(selas).not.toBeNull();
    let data = await selas.echo("hello");
    expect(data).not.toBeNull();
    expect(data).toBe("hello");
  });

  /**
   * Send a message to the selas server and wait for the same message to be received.
   * @param message - The message to send.
   * @returns a text message which is the same as the input message.
   */

  test("getAppUserCredits", async () => {
    const data = await selas.getAppUserCredits();
    expect(data).not.toBeNull();
  });

  test("getAppUserJobHistoryDetail", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.getAppUserJobHistory(10, 0);
    expect(data).not.toBeNull();
  });

  test("get service list", async () => {
    const data = await selas.getServiceList();
    expect(data).not.toBeNull();
  });

  test("get add on list", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = selas.getAddOnList();
    expect(data).not.toBeNull();
  });

  test("postJob", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.runStableDiffusion("A flying banana",{
      patches: [
        {
          name: 'Skippy Jack/f-boopboop',
          alpha_text_encoder: 0.5,
          alpha_unet: 0.5,
          steps: 1000,
        },
      ],
    });
    expect(data).not.toBeNull();
  });

  test("Get a config's cost for a job", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });

    const config: StableDiffusionConfig = {
      steps: 28,
      skip_steps: 0,
      batch_size: 1,
      sampler: "k_euler",
      guidance_scale: 10,
      width: 512,
      height: 512,
      prompt: "banana in the kitchen",
      negative_prompt: "ugly",
      image_format: "jpeg",
      translate_prompt: false,
      nsfw_filter: false,
    };
    const data = await selas.getServiceConfigCost(
      "stable-diffusion-1-5",
      JSON.stringify(config)
    );
    expect(data).toBeDefined();
  });

  test("get the number of worker for this filter", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.getCountActiveWorker();
    expect(data).toBeDefined();
  });

  test("Create a patch", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    let dataset = [
      {
        url: "https://img.sanctuary.fr/fiche/origin/78.jpg",
        label:
          "fcompo style, a group of people standing next to each other, by Otomo Katsuhiro, french comic style, zenescope, complex emotion, cover corp",
      },
      {
        url: "https://ramenparados.com/wp-content/uploads/2020/10/Family-Compo-destacado.jpg",
        label:
          "fcompo style, a couple sitting on top of a red fire hydrant, a manga drawing, by Yumihiko Amano, shin hanga, city hunter, beautiful anime girl squatting, katsuhiro otomo and junji ito, realistic manga",
      },
      {
        url: "https://www.manga-news.com/public/images/pix/serie/4219/family-compo-visual-4.jpg",
        label:
          "fcompo style, a drawing of a woman bending over on a skateboard, a manga drawing, by Fujishima Takeji, pixiv, shin hanga, wearing a tank top and shorts, early 90s cg, ( ultra realistic ), portrait of mayuri shiina",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBexZRrbQC-wMlw3Y04K9KKPH_Mu0yX5sjrzHjybroJNtYEz-aVusWrPHAMJF1svM71QQ&usqp=CAU",
        label:
          "fcompo style, a drawing of a woman holding a baseball bat, inspired by Kusumi Morikage, pixiv, shin hanga, fully clothed. painting of sexy, あかさたなは on twitter, pin on anime, initial d",
      },
    ];

    const data = await selas.runPatchTrainer(dataset, "f-compot7");
    expect(data).toBeDefined();
  });

  test("Share an add on", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.shareAddOn("f-compote3", "Bertrand");
    expect(data).toBeDefined();
  });

  test("Delete an add on", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.deleteAddOn("f-compo");
    expect(data).toBeDefined();
  });

  test("Rename an add on", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.renameAddOn("f-compote2", "f-compote3");
    expect(data).toBeDefined();
  });

  test("getResult", async () => {
    selas = await createSelasClient({
      app_id: process.env.TEST_APP_ID!,
      key: process.env.TEST_APP_KEY!,
      app_user_external_id: process.env.TEST_APP_USER_EXTERNAL_ID!,
      app_user_token: process.env.TEST_APP_USER_TOKEN!,
    });
    const data = await selas.getResult("c97ac10a-f647-4ab7-a531-9a8708df1c8d");
    expect(data).not.toBeNull();
  });
});
