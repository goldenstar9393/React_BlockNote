import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgpwidslaksyblejgbpg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ncHdpZHNsYWtzeWJsZWpnYnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MDMzNzIsImV4cCI6MjAzMzE3OTM3Mn0.r4RsXsf-Jc1L55Efn0qsQMoUpijTciNzFzPxOo1SRR0";
export const supabase = createClient(supabaseUrl, supabaseKey);
